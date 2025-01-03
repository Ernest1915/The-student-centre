import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type CredenzaModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (postContent: string) => void; // Pass the post content to the parent component
};

const CredenzaModal = ({ open, onClose, onConfirm }: CredenzaModalProps) => {
  const { toast } = useToast();

  // State to hold the post content
  const [postContent, setPostContent] = useState<string>("");

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button action (if any)

    if (!postContent) {
      return toast({
        title: "Please enter some content for the post.",
        variant: "destructive",
      });
    }

    // Pass the post content to the parent component
    onConfirm(postContent);

    // Clear the content after submission
    setPostContent("");
    toast({ title: "Post added successfully" });
  };

  return (
    <Credenza open={open} onOpenChange={onClose}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create a New Post</CredenzaTitle>
          <p>Share your thoughts with the community!</p>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="space-y-4">
            {/* Input for post content */}
            <textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Post</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default CredenzaModal;
