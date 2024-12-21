import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type PostLikesDialogProps = {
  isLikesDialogOpen: boolean;
  handleDialog: () => void;
};

export const PostLikesDialog = ({
  isLikesDialogOpen,
  handleDialog,
}: PostLikesDialogProps) => {
  return (
    <Dialog open={isLikesDialogOpen} onOpenChange={handleDialog}>
      <DialogContent>
        {" "}
        <DialogTitle>hh</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default PostLikesDialog;
