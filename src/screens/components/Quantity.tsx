import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

interface QuantityPickerProps {
  min: number;
  max: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  min,
  max,
  quantity,
  onQuantityChange,
}) => {
  const [value, setValue] = useState(quantity);
  const [disableDec, setDisableDec] = useState(quantity <= min);
  const [disableInc, setDisableInc] = useState(quantity >= max);

  useEffect(() => {
    setValue(quantity);
    setDisableDec(quantity <= min);
    setDisableInc(quantity >= max);
  }, [quantity, min, max]);

  const increment = () => {
    const newValue = value + 1;
    if (newValue <= max) {
      setValue(newValue);
      onQuantityChange(newValue);
      setDisableDec(false);
    }
    if (newValue === max) {
      setDisableInc(true);
    }
  };

  const decrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      setValue(newValue);
      onQuantityChange(newValue);
      setDisableInc(false);
    } else {
      setValue(min);
      setDisableDec(true);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          padding: 5,
          margin: 5,
          borderRadius: 5,
          backgroundColor: disableDec ? COLORS.gray : COLORS.red,
        }}
        onPress={decrement}
        disabled={disableDec}
      >
        <Text style={{ color: COLORS.white, fontSize: SIZES.h5 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: SIZES.h2, ...FONTS.h2 } as StyleProp<TextStyle>}>
        {value}
      </Text>
      <TouchableOpacity
        style={{
          padding: 4,
          paddingVertical: 5.4,
          margin: 5,
          borderRadius: 5,
          backgroundColor: disableInc ? COLORS.gray : COLORS.green,
        }}
        onPress={increment}
        disabled={disableInc}
      >
        <Text style={{ color: COLORS.white, fontSize: SIZES.h5 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityPicker;
