import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { adminMediaService } from "@/services/api";
import { toast } from "sonner";

// Use style-based attributors so formatting is saved inline (works without external CSS)
const AlignStyle = Quill.import("attributors/style/align") as object;
const BackgroundStyle = Quill.import("attributors/style/background") as object;
const ColorStyle = Quill.import("attributors/style/color") as object;
const FontStyle = Quill.import("attributors/style/font") as object;
const SizeStyle = Quill.import("attributors/style/size") as { whitelist: string[] };

SizeStyle.whitelist = ["0.75em", "1em", "1.25em", "1.5em", "2em", "2.5em"];

Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function QuillEditor({ value, onChange, placeholder = "Nhập nội dung...", minHeight = 320 }: QuillEditorProps) {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const result = await adminMediaService.upload(file);
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);
        if (editor && range != null) {
          editor.insertEmbed(range.index, "image", result.url, "user");
          editor.setSelection(range.index + 1, 0);
        }
        toast.success("Đã chèn ảnh");
      } catch {
        toast.error("Upload ảnh thất bại");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ size: ["0.75em", false, "1.25em", "1.5em", "2em", "2.5em"] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formats = [
    "header", "size",
    "bold", "italic", "underline", "strike",
    "blockquote", "code-block",
    "color", "background",
    "align",
    "list", "indent",
    "link", "image",
  ];

  return (
    <div className="quill-wrapper" style={{ ["--quill-min-height" as string]: `${minHeight}px` }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(val, _delta, source, editor) => {
          if (source === "user") {
            onChange(editor.getLength() > 1 ? val : "");
          }
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
