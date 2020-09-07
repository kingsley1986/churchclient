import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddComingWithModal from "../components/coming-with-modal.component";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
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

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import InfoIcon from "@material-ui/icons/Info";
import { Card, Avatar } from "antd";
import "antd/dist/antd.css";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function EventAndComments(props) {
  const EventComment = (props) => (
    <div className={classes.root}>
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
    </div>
  );

  const theme = useTheme();
  const [programs, setProgramData] = useState([]);
  const [comments, setCommentData] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  /**
   * The example data is structured as follows:
   *
   * import image from 'path/to/image.jpg';
   * [etc...]
   *
   * const tileData = [
   *   {
   *     img: image,
   *     title: 'Image',
   *     author: 'author',
   *   },
   *   {
   *     [etc...]
   *   },
   * ];
   */

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:9000/programs/" +
          props.match.params.id +
          "/programcomments"
      )

      .then((response) => {
        setProgramData(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const onPageLoad = () => {
    axios
      .get(
        "http://localhost:9000/programs/" +
          props.match.params.id +
          "/programcomments"
      )

      .then((response) => {
        setCommentData(response.data.programcomments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    onPageLoad();
  }, []);

  const [eventDescription, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

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
          "http://localhost:9000/programs/" +
            props.match.params.id +
            "/programcomment",
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

  let eventCommentList = comments.map((comment, k) => (
    <EventComment comment={comment} key={k} />
  ));

  let commentLengt =
    comments.length > 1
      ? comments.length + " " + "Comments"
      : comments.length + " " + "Comment";

  const { Meta } = Card;

  return (
    <Card
      type="flex"
      justify="center"
      align="middle"
      cover={
        <img
          alt="example"
          style={{
            height: "auto",
            width: "auto",
            maxWidth: "1000px",
            maxHeight: "1000px",
          }}
          src={programs.programImage}
        />
      }
    >
      <Meta title={programs.title} description={programs.description} />
      <br></br>
      <Paper className={classes.paper}>{eventCommentList}</Paper>
    </Card>
  );
  // <Grid
  //   container
  //   spacing={0}
  //   direction="column"
  //   alignItems="center"
  //   justify="center"
  //   style={{ minHeight: "100vh" }}
  // >
  //   <Card className={classes.root}>
  //     <h3
  //       style={{
  //         background: "	#800000",
  //         color: "white",
  //         textAlign: "center",
  //       }}
  //       className={classes.cardheader}
  //     >
  //       {programs.title}
  //     </h3>

  //     <CardMedia
  //       className={classes.media}
  //       image={programs.programImage}
  //       title="Paella dish"
  //     />
  //     <CardContent>
  //       <Typography variant="body2" color="textSecondary" component="p">
  //         {programs.description}
  //       </Typography>
  //     </CardContent>
  //   </Card>

  //   <>
  //     <div>
  //       <Button1 variant="outline-primary" size="sm">
  //         {commentLengt}
  //       </Button1>{" "}
  //     </div>
  //   </>
  //   <br></br>

  //   <form
  //     className={classes.root}
  //     noValidate
  //     autoComplete="off"
  //     onSubmit={onSubmit}
  //   >
  //     <FormControl>
  //       <InputLabel htmlFor="component-simple">Name</InputLabel>
  //       <Input
  //         id="component-simple"
  //         value={name}
  //         onChange={handleChange("name")}
  //         label="Name"
  //       />
  //     </FormControl>

  //     <FormControl variant="outlined">
  //       <InputLabel htmlFor="component-outlined">Description</InputLabel>
  //       <OutlinedInput
  //         id="component-outlined"
  //         value={eventDescription}
  //         onChange={handleChange("description")}
  //         label="Description"
  //         style={{ width: "42vw" }}
  //       />
  //     </FormControl>
  //     <Button type="submit" fullWidth variant="contained" color="primary">
  //       Create Comment
  //     </Button>
  //   </form>
  //   <CardContent>{eventCommentList}</CardContent>
  // </Grid>
}
