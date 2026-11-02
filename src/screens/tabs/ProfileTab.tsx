import {
  IntentCreationCallbackParams,
  PaymentSheetError,
  Result,
  useStripe,
} from "@stripe/stripe-react-native";
import { useCallback, useEffect } from "react";
import { Button, Linking, Text, View } from "react-native";

type Props = {};

const ProfileTab = (props: Props) => {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl ?? null);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      "url",
      (event: { url: string }) => {
        handleDeepLink(event.url);
      },
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  // CHECKOUT

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      returnURL: "com.easyride://stripe-redirect",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmationTokenConfirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const confirmHandler = async (
    confirmationToken: Result,
    intentCreationCallback: (params: IntentCreationCallbackParams) => void,
  ) => {
    console.log({
      confirmationToken,
    });

    // // Make a request to your own server to create a PaymentIntent and return its client secret
    // const response = await fetch(`${API_URL}/create-intent`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     confirmation_token_id: confirmationToken.id,
    //   }),
    // });
    // // Call the `intentCreationCallback` with your server response's client secret or error
    // const { client_secret, error } = await response.json();
    // if (client_secret) {
    //   intentCreationCallback({clientSecret: client_secret});
    // } else {
    //   intentCreationCallback({
    //     error: {
    //       localizedMessage: error.localizedMessage || 'An error occurred',
    //     },
    //   });
    // }
  };

  const didTapCheckoutButton = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, and so on
      }
    } else {
      // Payment completed - show a confirmation screen.
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 300 }}>
      <Text>ProfileTab</Text>
      <Button title="Purchase" onPress={didTapCheckoutButton} />
    </View>
  );
};

export default ProfileTab;
