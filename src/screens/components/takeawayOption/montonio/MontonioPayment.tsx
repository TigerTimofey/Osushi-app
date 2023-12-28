import React from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { COLORS, images } from "../../../../constants";

import {
  REACT_PUBLIC_API_KEY_MONTONIO_TEST,
  REACT_PUBLIC_SECRET_MONTONIO_TEST,
  REACT_PUBLIC_API_KEY_MONTONIO,
  REACT_PUBLIC_SECRET_MONTONIO,
} from "@env";

// import jwt from "jsonwebtoken";
// import axios from "axios";

// import restoranWorkData from "../../../constants/menu/timeStatesData";
// import CryptoJS from "react-native-crypto-js";
// import { SignOptions } from "jsonwebtoken";

const MontonioPayment = ({
  //   orderDetails,
  cartData,
  montonioOpen,
  setMontonioOpen,
  totalNumericPrice,
}) => {
  React.useEffect(() => {
    console.log("ORDER cartData IN MONTO", cartData);
    // console.log("ORDER orderDetails IN MONTO", orderDetails);
    console.log("TOTAL IN MONTO", totalNumericPrice);
  }, [montonioOpen]);

  const [loading, setLoading] = React.useState(false);

  //   const handleGetOrder = () => {
  //     const payload = {
  //       accessKey: REACT_PUBLIC_API_KEY_MONTONIO,
  //       merchantReference: "HERE IS ORDER ID NAME/TIME",
  //       returnUrl: restoranWorkData[0].returnPaymentUrl,
  //       notificationUrl: restoranWorkData[0].returnPaymentUrl,
  //       currency: "EUR",
  //       grandTotal: totalNumericPrice,
  //       locale: "et",
  //       payment: {
  //         method: "paymentInitiation",
  //         methodDisplay: "Pay with your bank",
  //         methodOptions: {
  //           paymentDescription: "Payment for order 123",
  //           preferredCountry: "EE",
  //           // This is the code of the bank that the customer chose at checkout.
  //           // See the GET /stores/payment-methods endpoint for the list of available banks.
  //           preferredProvider: "LHVBEE22",
  //         },
  //         amount: totalNumericPrice,
  //         currency: "EUR",
  //       },
  //     };
  //     const token = jwt.sign(payload, REACT_PUBLIC_SECRET_MONTONIO, {
  //       algorithm: "HS256",
  //       expiresIn: "10m",
  //       // Use the react-native-crypto-js library
  //       crypto: {
  //         getRandomValues: (buf) => CryptoJS.lib.WordArray.random(buf),
  //       },
  //     } as SignOptions);
  //   };

  //   axios
  //     .post("https://stargate.montonio.com/api/orders", {
  //       // data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJNWV9BQ0NFU1NfS0VZIiwibWVyY2hhbnRSZWZlcmVuY2UiOiJNWS1PUkRFUi1JRC0xMjMiLCJyZXR1cm5VcmwiOiJodHRwczovL215c3RvcmUuY29tL3BheW1lbnQvcmV0dXJuIiwibm90aWZpY2F0aW9uVXJsIjoiaHR0cHM6Ly9teXN0b3JlLmNvbS9wYXltZW50L25vdGlmeSIsImN1cnJlbmN5IjoiRVVSIiwiZ3JhbmRUb3RhbCI6OTkuOTksImxvY2FsZSI6ImV0IiwiYmlsbGluZ0FkZHJlc3MiOnsiZmlyc3ROYW1lIjoiQ3VzdG9tZXJGaXJzdCIsImxhc3ROYW1lIjoiQ3VzdG9tZXJMYXN0IiwiZW1haWwiOiJjdXN0b21lckBjdXN0b21lci5jb20iLCJhZGRyZXNzTGluZTEiOiJLYWkgMSIsImxvY2FsaXR5IjoiVGFsbGlubiIsInJlZ2lvbiI6Ikhhcmp1bWFhIiwiY291bnRyeSI6IkVFIiwicG9zdGFsQ29kZSI6IjEwMTExIn0sInNoaXBwaW5nQWRkcmVzcyI6eyJmaXJzdE5hbWUiOiJDdXN0b21lckZpcnN0U2hpcHBpbmciLCJsYXN0TmFtZSI6IkN1c3RvbWVyTGFzdFNoaXBwaW5nIiwiZW1haWwiOiJjdXN0b21lckBjdXN0b21lci5jb20iLCJhZGRyZXNzTGluZTEiOiJLYWkgMSIsImxvY2FsaXR5IjoiVGFsbGlubiIsInJlZ2lvbiI6Ikhhcmp1bWFhIiwiY291bnRyeSI6IkVFIiwicG9zdGFsQ29kZSI6IjEwMTExIn0sImxpbmVJdGVtcyI6W3sibmFtZSI6IkhvdmVyYm9hcmQiLCJxdWFudGl0eSI6MSwiZmluYWxQcmljZSI6OTkuOTl9XSwicGF5bWVudCI6eyJtZXRob2QiOiJwYXltZW50SW5pdGlhdGlvbiIsIm1ldGhvZERpc3BsYXkiOiJQYXkgd2l0aCB5b3VyIGJhbmsiLCJtZXRob2RPcHRpb25zIjp7InBheW1lbnRSZWZlcmVuY2UiOiIxMDEwMTA5IiwicGF5bWVudERlc2NyaXB0aW9uIjoiUGF5bWVudCBmb3Igb3JkZXIgMTIzIiwicHJlZmVycmVkQ291bnRyeSI6IkVFIiwicHJlZmVycmVkUHJvdmlkZXIiOiJMSFZCRUUyMiJ9LCJhbW91bnQiOjk5Ljk5LCJjdXJyZW5jeSI6IkVVUiJ9LCJpYXQiOjE2NzYwNDQ3NTksImV4cCI6MTY3NjA0NTM1OX0.VichbCT2QQUBXE_yGNXAuYuXrwxrNELTHMDH7_dAPzw",
  //       // data: token
  //       data: "515d51c5-4a4a-404c-96be-f7d6abae0daa",
  //     })
  //     .then((response) => {
  //       const { data } = response;
  //       console.log(data.paymentUrl);
  //       // https://stargate.montonio.com/some-random-uuid-v4

  //       /**
  //        * Note: After you have successfully created the order,
  //        * you may now pass the order.paymentUrl to the client-side.
  //        */

  //       // 6. Redirect the customer to the checkout page (frontend)
  //       // window.location.href = data.paymentUrl;
  //     });

  const test = () => {
    fetch("https://stargate.montonio.com/api/stores/payment-methods")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data from the response
        console.log("Response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    const payload = {
      accessKey: REACT_PUBLIC_API_KEY_MONTONIO_TEST,
    };

    // const token = jwt.sign(payload, REACT_PUBLIC_SECRET_MONTONIO_TEST, {
    //   algorithm: "HS256",
    //   expiresIn: "10m",
    // });

    // axios
    //   .get("https://stargate.montonio.com/api/stores/payment-methods", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     const { data } = response;
    //     console.log(data.paymentMethods);
    //     // use this data to render the payment methods
    //   });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={montonioOpen}>
      <ScrollView
        style={{
          borderRadius: 10,
          width: "100%",
          backgroundColor: COLORS.white,
          maxHeight: "100%",
        }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: "100%",
            height: 200,
          }}
        />
        <View style={styles.formContainer}>
          <Text>
            {loading && <ActivityIndicator size="large" color={COLORS.red} />}
          </Text>
          <TouchableOpacity
            onPress={() => {
              test();
            }}
          >
            <Text>GET BANK</Text>
          </TouchableOpacity>
        </View>

        {/* Close button */}
        <TouchableOpacity
          style={[styles.buttonBack, styles.absolute]}
          onPress={() => setMontonioOpen(false)}
        >
          <View>
            <Image
              source={images.back}
              resizeMode="contain"
              style={{
                width: 55,
                height: 55,
              }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonBack: {
    flex: 2,
    marginHorizontal: 10,
    height: 40,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  absolute: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default MontonioPayment;
