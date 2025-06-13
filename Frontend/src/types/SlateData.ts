import { BaseEditor, Descendant, BaseText } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type CustomElement = {
  type: "paragraph";
  children: CustomText[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
