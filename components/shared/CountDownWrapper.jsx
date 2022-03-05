import Countdown from "react-countdown";
import useHasMounted from "../../hooks/useHasMounted";

const CountDownWrapper = ({ date }) => {
  const hasMounted = useHasMounted();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div style={{ paddingTop: "10px" }}>
          <h6>İlan Süresi Dolmuştur!</h6>
        </div>
      );
    }
    return (
      <div>
        <div className="countdown_container">
          {days !== 0 ? (
            <div className="countdown-item">
              {days === 0 ? 0 : days}
              <span>gün</span>
            </div>
          ) : null}
          {hours !== 0 ? (
            <div className="countdown-item">
              {hours === 0 ? 0 : hours}
              <span>saat</span>
            </div>
          ) : null}
          {minutes !== 0 ? (
            <div className="countdown-item">
              {minutes === 0 ? 0 : minutes}
              <span>dakika</span>
            </div>
          ) : null}
          {
            <div className="countdown-item">
              {seconds === 0 ? 0 : seconds}
              <span>saniye</span>
            </div>
          }
        </div>
      </div>
    );
  };
  return <Countdown date={date} renderer={renderer} />;
};

export default CountDownWrapper;
