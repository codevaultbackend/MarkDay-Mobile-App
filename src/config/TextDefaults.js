import React from "react";
import { Text, TextInput } from "react-native";

const TextRender = Text.render;
Text.render = function (...args) {
  const origin = TextRender.call(this, ...args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
    style: [{ includeFontPadding: false, color: "red" }, origin.props.style],
  });
};

const TextInputRender = TextInput.render;
TextInput.render = function (...args) {
  const origin = TextInputRender.call(this, ...args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
    style: [{ includeFontPadding: false, color: "red" }, origin.props.style],
  });
};