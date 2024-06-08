import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { cva } from "class-variance-authority";
import useModal from "@/store/ModalStore";
import { cn } from "@/lib/utils";

const Modal = ({ id, children, className }) => {
  const isOpen = useModal((state) => state.isOpen(id));
  const closeModal = useModal((state) => state.closeModal);

  const dialogVariants = cva(
    "max-w-screen-md p-1 flex items-center justify-center"
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal(id)}>
      <DialogContent className={cn(dialogVariants(), className)}>
        {children}
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default Modal;
