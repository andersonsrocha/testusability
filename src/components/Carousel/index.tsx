import { Carousel as AntCarousel, CarouselProps } from "antd";
import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { CustomArrowProps } from "@ant-design/react-slick/types";
import styled from "@emotion/styled";

/**
 * Estiliza e cria um componente que será o botão de
 * next e previous do carrossel.
 */
const ArrowStyled = styled("div")({
  position: "absolute",
  transform: "translateY(50%)",
  top: "50%",
  fontSize: 20,
  background: "rgb(255, 255, 255, .05)",
  width: 40,
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 100,

  "&.prev": {
    left: 0,
  },

  "&.next": {
    right: 0,
  },

  "&:hover": {
    background: "rgb(255, 255, 255, .1)",
  },
});

/**
 * ✨ Componente do botão de anterior do carrossel.
 *
 * @param {CustomArrowProps} props propriedades
 * @returns componente de anterior
 */
export function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;

  return (
    <ArrowStyled className="prev" onClick={onClick}>
      <LeftOutlined />
    </ArrowStyled>
  );
}

/**
 * ✨ Componente do botão de próximo do carrossel.
 *
 * @param {CustomArrowProps} props propriedades
 * @returns componente de próximo
 */
export function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;

  return (
    <ArrowStyled className="next" onClick={onClick}>
      <RightOutlined />
    </ArrowStyled>
  );
}

/**
 * ✨ Componente de carrossel.
 *
 * @param {CarouselProps} props propriedades
 * @returns componente de carrosel
 */
export function Carousel(props: CarouselProps) {
  return <AntCarousel {...props} nextArrow={<NextArrow />} prevArrow={<PrevArrow />} />;
}
