import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddComingWithModal from "../components/coming-with-modal.component";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default function EventAndComments(props) {
  const theme = useTheme();
  const [eventComments, setTileData] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 850,
    },
    media: {
      height: 0,

      paddingTop: "86%", // 16:9
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:9000/events/" +
          props.match.params.id +
          "/eventcomments"
      )
      .then((response) => {
        setTileData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const nowIso = new Date();
  const getTitle = (startDateTs, endDateTs) => {
    const now = Date.parse(nowIso);

    if (endDateTs <= now) {
      return "Started:" + " " + moment(startDateTs).format("LLLL");
    }

    if (startDateTs < now && endDateTs > now) {
      return "Live:" + " " + moment(startDateTs).format("LLLL");
    }

    return "Starting:" + " " + moment(startDateTs).format("LLLL");
  };

  const getEnded = (startDateTs, endDateTs) => {
    const now = Date.parse(nowIso);

    if (endDateTs <= now) {
      return "Ended:" + " " + moment(startDateTs).format("LLLL");
    }

    if (startDateTs < now && endDateTs > now) {
      return "Will End:" + " " + moment(startDateTs).format("LLLL");
    }

    return "Ends:" + " " + moment(startDateTs).format("LLLL");
  };

  const [eventDescription, setEventComment] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (parameter) => (event) => {
    if (parameter === "name") {
      setName(event.target.value);
    }
    if (parameter === "description") {
      setEventComment(event.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:9000/events/" +
          props.match.params.id +
          "/eventcomment",
        { name: name, description: eventDescription }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card className={classes.root}>
        <h3
          style={{
            background: "	#800000",
            color: "white",
            textAlign: "center",
          }}
          className={classes.cardheader}
        >
          {eventComments.title}
        </h3>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              CB
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={getTitle(
            Date.parse(eventComments.startingDate),
            Date.parse(eventComments.closingDate)
          )}
          subheader={getEnded(
            Date.parse(eventComments.startingDate),
            Date.parse(eventComments.closingDate)
          )}
          style={{ background: "#DCDCDC" }}
        />
        <CardMedia
          className={classes.media}
          image={eventComments.eventImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {eventComments.description}
          </Typography>
        </CardContent>
      </Card>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input
            id="component-simple"
            value={name}
            onChange={handleChange("name")}
            label="Name"
          />
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Description</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={eventDescription}
            onChange={handleChange("description")}
            label="Description"
          />
        </FormControl>
        <input
          type="submit"
          className="btn btn-outline-warning btn-block mt-4"
        />
      </form>
    </Grid>
  );
}
