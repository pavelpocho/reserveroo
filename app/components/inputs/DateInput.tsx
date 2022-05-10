import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { getInputDateFromString } from "~/utils/forms";

interface DateInputProps {
  name: string,
  defaultValue: Date | null,
  title: string,
  onChange: React.Dispatch<React.SetStateAction<Date | null>>
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
`;

const Header = styled.div`

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

const DayButton: React.FC<DayButtonProps> = ({ disabled, date, selected, onClick }: DayButtonProps) => <Button disabled={disabled} selected={selected} onClick={(e) => {
  e.preventDefault();
  onClick();
}}>{date.toString()}</Button>

export const DateInput: React.FC<DateInputProps> = ({ name, defaultValue, title, onChange }: DateInputProps) => {

  const [ value, setValue ] = React.useState<string>(getInputDateFromString(defaultValue));
  const [ { year, month }, setYearMonth ] = React.useState<YearMonth>({ year: (new Date()).getFullYear(), month: (new Date().getMonth()) });
  const [ date, setDate ] = React.useState<number | null>((new Date()).getDate());

  React.useEffect(() => {
    setValue(date ? getDateFromParts(year, month, date) : '');
    onChange(date ? new Date(year, month, date) : null)
  }, [date])

  const startPadding = (new Date(year, month, 1)).getDay() == 0 ? 6 : (new Date(year, month, 1)).getDay() - 1;
  const maxDayOfPreviousMonth = getMaxDayOfMonth(month > 0 ? year : year - 1, month > 0 ? month - 1 : month + 11);

  const days = [...Array(getMaxDayOfMonth(year, month)).keys()];
  const endPadding = 7 - (days.length + startPadding) % 7;

  console.log([...Array(startPadding).keys()]);

  return <div>
    <label>{title}</label>
    <Calendar>
      <Header>
        <button onClick={(e) => {
          e.preventDefault();
          setYearMonth({
            year,
            month: month - 1
          });
        }}>Prev month</button>
        <button onClick={(e) => {
          e.preventDefault();
          setYearMonth({
            year,
            month: month + 1
          });
        }}>Next month</button>
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
    </Calendar>
    <input name={name} type='date' value={value} readOnly={true} />
  </div>

}
