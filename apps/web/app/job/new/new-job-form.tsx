"use client";

import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Toggle } from "@/_components/ui/toggle";
import { client } from "@/_lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { Bold as BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  minSalary: z.number().int().positive().optional(),
  maxSalary: z.number().int().positive().optional(),
});

const NewJobForm = ({ token }: { token: string }) => {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const id = useId();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const description = useWatch({
    name: "description",
    control: form.control,
  });

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic, Underline],
    content: description,
    editorProps: {
      attributes: {
        class: "prose prose-base md:prose-sm m-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      form.setValue("description", editor.getHTML());
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => {
      const response = await client.postings.$post({
        header: {
          authorization: `Bearer ${token}`,
        },
        json: {
          title,
          description,
        },
      });

      return await response.json();
    },
    onSuccess: (data) => {
      router.replace(`/job/${data.id}/${data.slug}`);
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createJobMutation.mutate({
      title: data.title,
      description: data.description,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>

              <FormControl>
                <Input placeholder="Manager" {...field} />
              </FormControl>

              <FormDescription>This is the title of the job.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel htmlFor={`description-${id}`}>Description</FormLabel>

          <div>
            <Toggle
              pressed={editor?.isActive("bold")}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <BoldIcon className="size-4" />
            </Toggle>

            <Toggle
              pressed={editor?.isActive("italic")}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon className="size-4" />
            </Toggle>

            <Toggle
              pressed={editor?.isActive("underline")}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="size-4" />
            </Toggle>
            <div />

            <EditorContent editor={editor} id={`description-${id}`} />
          </div>

          <FormDescription className="sr-only">
            This is the description of the job.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewJobForm;
