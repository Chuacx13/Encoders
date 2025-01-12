import { Typography } from "antd";

type TextProps = {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "huge"
    | "xhuge"
    | "xxhuge";
} & React.ComponentProps<typeof Typography.Text>;

// Remove size = "sm"
export const Text = ({ children, ...rest }: TextProps) => {
  return <Typography.Text {...rest}>{children}</Typography.Text>;
};
