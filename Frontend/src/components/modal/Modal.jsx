import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModal from "@/store/ModalStore";

const Modal = ({ children, classNames }) => {
  const { isOpen, closeModal } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={classNames}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
