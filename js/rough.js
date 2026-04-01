const elements = document.querySelectorAll(".rough");

const SN_FACTOR = 2;
const ROUGHNESS = 2;

const sn = () => (Math.random() - 0.5) * 2 * SN_FACTOR;

const setSvgBorders = () => {
  elements.forEach((element) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "1px";
    svg.style.height = "1px";
    svg.style.overflow = 'visible';
    if (element.tagName == "HR") {
        element.style.position = element.style.position || "relative";
        element.style.overflow = "visible";
        element.appendChild(svg);
        svg.style.position = "absolute";
        svg.style.top = "-10px";
        svg.style.left = "-10px";
        const roughSvg = rough.svg(svg);
        const size = element.getBoundingClientRect();
        svg.appendChild(
          roughSvg.line(10 + sn(), 10 + sn(), size.width + sn(), size.height + 10 + sn(), { roughness: ROUGHNESS }),
        );
      return;
    }
    if (element.tagName == "IMG") {
      const parent = element.parentElement;
      parent.style.position = parent.style.position || "relative";
      parent.style.overflow = "visible";
      element.after(svg);
    } else {
      element.style.position = element.style.position || "relative";
      element.style.overflow = "visible";
      element.insertBefore(svg, element.firstChild);
    }
    svg.style.position = "absolute";
    svg.style.top = "-10px";
    svg.style.left = "-10px";
    const roughSvg = rough.svg(svg);
    const size = element.getBoundingClientRect();
    svg.appendChild(
      roughSvg.rectangle(10 + sn(), 10 + sn(), size.width + sn(), size.height + sn(), { roughness: ROUGHNESS }),
    );

    console.log(element, size.width, size.height);
  });
};

window.onload = () => {
    // Do it twice to get four strokes
  setSvgBorders();
  setSvgBorders();
};
