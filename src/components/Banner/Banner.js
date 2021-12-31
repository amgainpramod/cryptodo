import { makeStyles, Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  bannerTagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  bannerTitle: {
    fontWeight: "bold",
    marginBottom: "15",
    fontFamily: "Montserrat",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "gold",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.bannerTagline}>
          <Typography variant="h2" className={classes.bannerTitle}>
            CRYPTODO
          </Typography>
          <Typography variant="subtitle2" className={classes.bannerSubtitle}>
            Get all the info regarding your favorite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
