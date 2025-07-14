import React, { useMemo } from "react";
import { Card, CardProps } from "antd";
import { useUiSettingsContext } from "../settings";
import styled from "styled-components";

interface IACardProps extends CardProps {
  cardRef?: React.RefObject<HTMLDivElement>;
  variant?: "default" | "shadowed" | "noPadding" | "backgroundLess" | "inner";
  noPaddingInMobile?: boolean;
}

const StyledCard: IACardProps = styled(Card)`
  box-shadow: 0px 5px 0px 0px
    ${({ theme }: { theme: any }) => theme.colorBorder};
  border: 2px solid ${({ theme }: { theme: any }) => theme.colorBorder};
  // border-radius: 10px !important;
  padding: 20px, 10px, 20px !important;
  ${({ noPaddingInMobile }: IACardProps) =>
    noPaddingInMobile
      ? `

     .ant-card-body {
        padding: 0px !important;
     }
     
    `
      : ""};
` as unknown as IACardProps;
const NoPaddingStyledCard: IACardProps = styled(Card)`
  border: 1px solid ${({ theme }: { theme: any }) => theme.colorBorder};
  // border-radius: 10px !important;
  padding: 0 !important;
  overflow: hidden !important;
  .ant-card-body {
    background: ${({ theme }: { theme: any }) =>
      theme.colorBgBase === "#fff" ? "#f8f8f8" : ""} !important;
    overflow: hidden !important;
    padding: 0px !important;
  }
` as unknown as IACardProps;

const InnerStyledCard: IACardProps = styled(Card)`
  border: 1px solid ${({ theme }: { theme: any }) => theme.colorBorder};
  // border-radius: 10px !important;
  padding: 0 !important;
  overflow: hidden !important;
  .ant-card-body {
    background: ${({ theme }: { theme: any }) =>
      theme.colorFillSecondary} !important;
    overflow: hidden !important;
    padding: 12px !important;
  }
` as unknown as IACardProps;

const NoBackgroundStyledCard: IACardProps = styled(Card)`
  border: 1px solid ${({ theme }: { theme: any }) => theme.colorBorder};
  // border-radius: 10px !important;
  padding: 0 !important;
  background: none !important;
  .ant-card-body {
    padding: 0px !important;
  }
` as unknown as IACardProps;

export const ACard = ({
  variant = "default",
  cardRef,
  ...props
}: IACardProps) => {
  const { size: configSize } = useUiSettingsContext();
  const size = useMemo(() => {
    switch (configSize) {
      case "large":
      case "medium": {
        return "default";
      }
      default: {
        return configSize;
      }
    }
  }, [configSize]);

  if (variant === "noPadding") {
    // @ts-ignore
    return <NoPaddingStyledCard ref={cardRef} size={size} {...props} />;
  }
  if (variant === "backgroundLess") {
    // @ts-ignore
    return <NoBackgroundStyledCard ref={cardRef} size={size} {...props} />;
  }

  if (variant === "shadowed") {
    // @ts-ignore
    return <StyledCard ref={cardRef} size={size} {...props} />;
  }
  if (variant === "inner") {
    // @ts-ignore
    return <InnerStyledCard ref={cardRef} size={size} {...props} />;
  }
  return <Card ref={cardRef} size={size} {...props} />;
};
