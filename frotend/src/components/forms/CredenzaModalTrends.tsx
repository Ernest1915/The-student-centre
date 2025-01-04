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

type CredenzaModalTrendProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (media: File | null, caption: string) => void; // Pass the media and caption to the parent component
};

const CredenzaModalTrend = ({
  open,
  onClose,
  onConfirm,
}: CredenzaModalTrendProps) => {
  const { toast } = useToast();

  // State to hold the caption and media
  const [caption, setCaption] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setMedia(file);
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button action (if any)

    if (!media || !caption) {
      return toast({
        title: "Please provide a media file and caption.",
        variant: "destructive",
      });
    }

    // Pass the media and caption to the parent component
    onConfirm(media, caption);

    // Clear the content after submission
    setMedia(null);
    setCaption("");
    toast({ title: "Trend posted successfully" });
  };

  return (
    <Credenza open={open} onOpenChange={onClose}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create a New Trend</CredenzaTitle>
          <p>Share your trend with the community (image/video + caption)</p>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="space-y-4">
            {/* Input for media upload */}
            <div>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="w-full p-2 border rounded-md"
              />
              {media && <p className="mt-2 text-gray-700">{media.name}</p>}
            </div>
            {/* Input for caption */}
            <textarea
              placeholder="Enter your caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Post Trend</Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default CredenzaModalTrend;
