import "./Confirmation.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface confirmationInterface {
  btnConfirm: any;
  closeModal: any;
  action: string;
  whatItem: string;
}

const Confirmation = ({
  btnConfirm,
  closeModal,
  action,
  whatItem,
}: confirmationInterface) => {
  return (
    <div className="confirmation">
      <div className="confirmationHeader">&nbsp; Confirm</div>
      <div className="confirmationBody">
        <span>
          Are you sure you want to {action} this {whatItem}?
        </span>
        <div className="confirmationDivBtns">
          <button className="confirmationBtnYes" onClick={btnConfirm}>
            <AiOutlineCheck />
          </button>
          <button className="confirmationBtnNo" onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
