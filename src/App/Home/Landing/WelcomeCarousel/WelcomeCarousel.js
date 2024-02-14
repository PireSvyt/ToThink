import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

// Carousel
// https://github.com/maxmarinich/react-alice-carousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./_styles/AliceCarousel.css";

import carousel1pic from "./_resources/KISS.gif";
import carousel2pic from "./_resources/PerformStoreExams.gif";
import carousel3pic from "./_resources/easybro.gif";

export default function WelcomeCarousel() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("WelcomeCarousel");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 330;

  const items = [
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel1")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Keep it simple and stupid"
        src={carousel1pic}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel2")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Perform and store exams"
        src={carousel2pic}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel3")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Easy bro"
        src={carousel3pic}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
  ];

  // Carousel parameters
  const responsive = {
    0: { items: 1 },
    1024: { items: 3 },
  };

  // Render
  return (
    <Box sx={{ mt: 1, mb: 3 }}>
      <AliceCarousel
        autoPlay
        autoPlayControls={false}
        autoPlayStrategy="none"
        autoPlayInterval={8000}
        animationDuration={500}
        infinite
        touchTracking
        disableButtonsControls
        items={items}
        data-testid="component-carousel" 
      />
    </Box>
  );
}