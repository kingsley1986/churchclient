import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function Program() {
  const theme = useTheme();
  const [programData, setProgramData] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1100,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    image: {
      height: "68%",
      width: "530px",
      objectFit: "cover",
      paddingBottom: 10,
    },
  }));
  useEffect(() => {
    axios
      .get("http://localhost:9000/programs")
      .then((response) => {
        setProgramData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridListTile key="Subheader" style={{ height: "auto" }}></GridListTile>
      <GridList
        cellHeight={600}
        cols={matches ? 1 : 3}
        className={classes.gridList}
        spacing={8}
      >
        {programData.length > 0 &&
          programData.map((tile, index) => {
            return (
              <GridListTile
                key={Math.floor(Math.random() * new Date().getTime())}
              >
                <img
                  src={tile.programImage}
                  alt={tile.title}
                  class={classes.image}
                />
                <GridListTileBar titlePosition="top" title={tile.title} />
                <Typography paragraph style={{ borderStyle: "ridge" }}>
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
              </GridListTile>
            );
          })}
      </GridList>
    </div>
  );
}
