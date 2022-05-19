import { Place, Reservable, Reservation } from "@prisma/client"
import styled from "styled-components";
import CalendarIcon from "~/assets/icons/Calendar";
import ClockIcon from "~/assets/icons/Clock";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { ReservableTypeWithTexts, ReservationStatus as R } from "~/types/types"
import { getStringTimeValue } from "~/utils/forms";
import { Amount, Indicator } from "../place/facilities-indicator";

interface ReservationSummaryProps {
  reservation: Reservation & {
    reservable: (Reservable & {
      ReservableType: ReservableTypeWithTexts
      place: Place
    }) | null;
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[2]};
  display: flex;
  border-top-left-radius: 0.25rem;
  overflow: hidden;
  border-top-right-radius: 0.25rem;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 1rem;
  color: ${styles.colors.action};
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

const Status = styled.p`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8125rem;
  padding: 0.2rem;
  box-shadow: ${styles.shadows[2]};
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  margin: 0;
`;

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({ reservation: r }) => {

  const { lang } = useLangs();

  return <Wrap>
    <Background>
      { r?.reservable?.ReservableType.multiLangName && <Indicator key={r.id}>{r.reservable.ReservableType.multiLangName[lang]}</Indicator>}
      <div>
        <CalendarIcon /><Value>{new Date(r.start).toLocaleDateString()}</Value>
      </div>
      <div>
        <ClockIcon />
        <Value>{getStringTimeValue(new Date(r.start))} - {getStringTimeValue(new Date(r.end))}</Value>
      </div>
    </Background>
    <Status style={{
      backgroundColor: (r.status) == R.AwaitingConfirmation ? styles.colors.warn : 
      (r.status) == R.Confirmed ? styles.colors.free : 
      (r.status) == R.Rejected ? styles.colors.busy : 
      (r.status) == R.Cancelled ? styles.colors.gray[70] : 
      (r.status) == R.Paid ? styles.colors.free :
      (r.status) == R.Past ? styles.colors.gray[30] : ''
    }}>{
      (r.status) == R.AwaitingConfirmation ? 'Awaiting confirmation' : 
      (r.status) == R.Confirmed ? 'Confirmed' : 
      (r.status) == R.Rejected ? 'Rejected' : 
      (r.status) == R.Cancelled ? 'Cancelled' : 
      (r.status) == R.Paid ? 'Paid' :
      (r.status) == R.Past ? 'Past' : '' 
    }</Status>
  </Wrap>
}