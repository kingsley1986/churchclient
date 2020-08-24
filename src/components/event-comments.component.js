import React, { useState, useEffect, useCallback } from "react";
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
import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Paper from "@material-ui/core/Paper";
import Button1 from "react-bootstrap/Button";

export default function EventAndComments(props) {
  const EventComment = (props) => (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{props.comment.name}</Typography>
            <Typography>{props.comment.description}</Typography>
            <Typography>{props.comment.createdAt}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );

  const theme = useTheme();
  const [events, setEventData] = useState([]);
  const [comments, setCommentData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 550,
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
        "https://cryptic-shelf-72177.herokuapp.com/events/" +
          props.match.params.id +
          "/eventcomments"
      )

      .then((response) => {
        setEventData(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [events]);
  const onPageLoad = () => {
    axios
      .get(
        "https://cryptic-shelf-72177.herokuapp.com/events/" +
          props.match.params.id +
          "/eventcomments"
      )

      .then((response) => {
        setCommentData(response.data.eventcomments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    onPageLoad();
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

  const [eventDescription, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [going, setGoing] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const handleChange = (parameter) => (event) => {
    if (parameter === "name") {
      setName(event.target.value);
    }
    if (parameter === "description") {
      setDescription(event.target.value);
    }
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setName("");
      setDescription("");
      axios
        .post(
          "https://cryptic-shelf-72177.herokuapp.com/events/" +
            props.match.params.id +
            "/eventcomment",
          { name: name, description: eventDescription }
        )

        .then(function (response) {
          onPageLoad();
        })

        .catch(function (error) {
          console.log(error);
        });
    },
    [props.match.params.id, name, eventDescription]
  );

  const updateGoing = (going) => {
    axios
      .get(
        "https://cryptic-shelf-72177.herokuapp.com/events/" +
          props.match.params.id +
          "/going"
      )
      .then((response) => {
        setEventData(response.data);
      });
  };

  let eventCommentList = comments.map((comment, k) => (
    <EventComment comment={comment} key={k} />
  ));

  let commentLengt =
    comments.length > 1
      ? comments.length + " " + "Comments"
      : comments.length + " " + "Comment";
  let goingAndComingwith =
    events.going + events.coming_with <= 1
      ? events.going + events.coming_with + " " + "Person Coming"
      : events.going + events.coming_with + " " + "People are Coming";

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
          {events.title}
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
            Date.parse(events.startingDate),
            Date.parse(events.closingDate)
          )}
          subheader={getEnded(
            Date.parse(events.startingDate),
            Date.parse(events.closingDate)
          )}
          style={{ background: "#DCDCDC" }}
        />
        <CardMedia
          className={classes.media}
          image={events.eventImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {events.description}
          </Typography>
        </CardContent>
      </Card>

      <>
        <div>
          <Button1 variant="outline-primary" size="sm">
            {commentLengt}
          </Button1>{" "}
          <Button1
            style={{ margin: "5px" }}
            variant="outline-success"
            size="sm"
          >
            {goingAndComingwith}
          </Button1>
          <Button1
            variant="success"
            size="sm"
            color="primary"
            onClick={() => {
              updateGoing(events._id);
              setModalShow(true);
            }}
          >
            Are you Coming? Click Here!
          </Button1>{" "}
        </div>
      </>
      <br></br>

      <AddComingWithModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        state={events._id}
        history={props.history}
      />

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
            style={{ width: "42vw" }}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Create Comment
        </Button>
      </form>
      <CardContent>{eventCommentList}</CardContent>
    </Grid>
  );
}
