import React from "react";
import styled from "styled-components";
import AngleLeftIcon from "~/assets/icons/AngleLeft";
import AngleRightIcon from "~/assets/icons/AngleRight";
import CalendarIcon from "~/assets/icons/Calendar";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { getInputDateFromString } from "~/utils/forms";

interface DateInputProps {
  name: string,
  defaultValue: Date | null,
  title: string,
  onChange: React.Dispatch<React.SetStateAction<Date | null>>,
  disablePast?: boolean
}

const DateInputField = styled.input`
  font-size: 0.8rem;
  line-height: 2rem;
  padding: 0rem 1rem;
  border: 1.5px solid ${styles.colors.gray[30]};
  border-radius: 0.3rem;
  outline: none;
  width: 5ch;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
  }
`;

const Calendar = styled.div`
  width: 15rem;
  height: 15rem;
  position: absolute;
  background-color: ${styles.colors.white};
  border: 1px solid ${styles.colors.gray[10]};
  box-shadow: ${styles.shadows[0]};
  border-radius: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0rem 0.1rem;
  gap: 0.4rem;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
`;

const Button = styled.button<{ selected?: boolean }>`
  border-radius: 100%;
  height: 2rem;
  width: 2rem;
  border: none;
  cursor: pointer;
  color: ${props => props.selected ? styles.colors.white : styles.colors.black};
  &:disabled {
    color: ${styles.colors.gray[60]};
  }
  &:hover {
    background-color: ${props => props.selected ? styles.colors.primary : styles.colors.gray[20]};
  }
  background-color: ${props => props.selected ? styles.colors.primary : styles.colors.white};
`;

interface YearMonth {
  year: number;
  month: number;
}

const getMaxDayOfMonth = (year: number, month: number) => (
  month === 1 && year % 400 === 0 ? 29 : 
  month === 1 && year % 100 === 0 ? 28 : 
  month === 1 && year % 4 === 0 ? 29 : 
  [3, 5, 8, 10].includes(month) ? 30 : 
  31
)

const getDateFromParts = (year: number, month: number, date: number) => (
  `${year?.toString()}-${month < 9 ? '0' : ''}${(month + 1).toString()}-${date < 10 ? '0' : ''}${date?.toString()}`
)

const getYearMonthFromValue = (str: string): YearMonth => ({ year: parseInt(str.split('-')[0]), month: parseInt(str.split('-')[1]) - 1 });

interface DayButtonProps {
  date: number,
  onClick: () => void,
  selected?: boolean,
  disabled?: boolean
}

const Wrap = styled.button`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 1px solid ${styles.colors.gray[20]};
  border-radius: 0.5rem;
  background-color: ${styles.colors.white};
`;

const DateDisplay = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const Month = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  border-radius: 0.3rem;
  &>svg {
    height: 1.1rem;
  }
  &:hover {
    background-color: ${styles.colors.gray[20]};
  }
`;

const DayButton: React.FC<DayButtonProps> = ({ disabled, date, selected, onClick }: DayButtonProps) => <Button disabled={disabled} selected={selected} onClick={(e) => {
  e.preventDefault();
  onClick();
}}>{date.toString()}</Button>

export const DateInput: React.FC<DateInputProps> = ({ disablePast, name, defaultValue, title, onChange }: DateInputProps) => {

  const [ value, setValue ] = React.useState<string>(getInputDateFromString(defaultValue));
  const [ { year, month }, setYearMonth ] = React.useState<YearMonth>({ year: (new Date()).getFullYear(), month: (new Date().getMonth()) });
  const [ date, setDate ] = React.useState<number | null>((new Date()).getDate());
  const [ showCalendar, setShowCalendar ] = React.useState(false);

  const { translations: l } = useLangs();

  React.useEffect(() => {
    setValue(date ? getDateFromParts(year, month, date) : '');
    onChange(date ? new Date(year, month, date) : null)
  }, [date])

  const startPadding = (new Date(year, month, 1)).getDay() == 0 ? 6 : (new Date(year, month, 1)).getDay() - 1;
  const maxDayOfPreviousMonth = getMaxDayOfMonth(month > 0 ? year : year - 1, month > 0 ? month - 1 : month + 11);

  const days = [...Array(getMaxDayOfMonth(year, month)).keys()];
  const endPadding = 7 - (days.length + startPadding) % 7;

  return <div>
    <label>{title}</label>
    <Wrap onClick={(e) => {
      e.preventDefault();
      setShowCalendar(!showCalendar);
    }}>
      <CalendarIcon height={'1.4rem'} />
      <DateDisplay>{value}</DateDisplay>
    </Wrap>
    { showCalendar && <Calendar>
      <Header>
        <HeaderButton onClick={(e) => {
          setYearMonth({
            year: month == 0 ? year - 1 : year,
            month: month == 0 ? 11 : month - 1
          });
        }}><AngleLeftIcon /></HeaderButton>
        <Month>{l.months[month]}</Month>
        <HeaderButton onClick={(e) => {
          e.preventDefault();
          setYearMonth({
            year: month == 11 ? year + 1 : year,
            month: month == 11 ? 0 : month + 1
          });
        }}><AngleRightIcon /></HeaderButton>
      </Header>
      <Body>
        { [...Array(startPadding).keys()].map((_, i) => maxDayOfPreviousMonth - i).reverse().map(d => <DayButton
          disabled={true}
          key={d}
          onClick={() => {
            setYearMonth({
              year,
              month: month - 1
            });
            setDate(d);
          }}
          date={d}
        />) }
        { days.map(d => <DayButton
          key={d + 32}
          disabled={disablePast && (new Date().getDate() > d + 1 && new Date().getMonth() == month) || (new Date().getMonth() > month && new Date().getFullYear() == year) || new Date().getFullYear() > year}
          selected={d + 1 == date && getYearMonthFromValue(value).month == month && getYearMonthFromValue(value).year == year}
          date={d + 1}
          onClick={() => {
            setDate(d + 1);
          }}
        />) }
        { [...Array(endPadding).keys()].map(d => <DayButton
          disabled={true}
          key={d + 64}
          date={d + 1}
          onClick={() => {
            setDate(d + 1);
            setYearMonth({
              year,
              month: month + 1
            })
          }}
        />) }
      </Body>
    </Calendar> }
    <input name={name} type='date' value={value} readOnly={true} hidden={true} />
  </div>

}
