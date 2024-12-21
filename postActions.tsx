import { Bookmark } from "lucide-react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { PostLikesDialog } from "./PostLikesDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const PostActions = ({ postId }: { postId: string }) => {
  const [isLikesDialogOpen, setIsLikesDialogOpen] = useState(false);
  const handleDialog = () => setIsLikesDialogOpen((prev) => !prev);
  const router = useRouter();

  return (
    <>
      <div className=" flex justify-between">
        <div className="flex gap-2">
          <Heart />
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />
      </div>
      <div className="font-Bold text-lg" onClick={handleDialog}>
        0 likes
      </div>
      <div onClick={() => router.push(`/posts/comment"${post._id}`)}>
        View all comments
      </div>
      <PostLikesDialog
        isLikesDialogOpen={isLikesDialogOpen}
        handleDialog={handleDialog}
      />
    </>
  );
};

export default PostActions;
