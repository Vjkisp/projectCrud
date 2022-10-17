import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./table.css";
import { TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useEffect, useState } from "react";

function Table() {
  const [copy, setCopy] = useState([{ amount: "", date: "", bank: "" }]);
  const [totalSum, setTotalSum] = useState("0");

  useEffect(() => {
    let sum = 0;
    copy.map((item) => {
      if (item.amount) sum += parseInt(item.amount, 10);
    });
    setTotalSum(sum);
  }, [copy]);
  let AddForm = () => {
    if (
      copy[copy.length - 1].amount !== "" &&
      copy[copy.length - 1].date !== "" &&
      copy[copy.length - 1].bank !== ""
    ) {
      setCopy((prev) => [...prev, { amount: "", date: "", bank: "" }]);
    }
  };
  let handleSubmit = () => {
    console.log(copy);
  };
  let handleChange = (e, i) => {
    const { name, value } = e.target;
    let tempCopy = [...copy];
    tempCopy[i][name] = value;
    setCopy([...tempCopy]);
  };
  let DeleteForm = (ind) => {
    const tempArr = [...copy];
    tempArr.splice(ind, 1);
    setCopy([...tempArr]);
  };
  return (
    <Grid xs={4} md={8} lg={8} className="modelChq">
      <Grid xs={4} md={6} lg={8} className="chqHeader">
        <span xs={2} md={4} lg={4} className="title">
          Invoice No :
        </span>
        <span xs={2} md={4} lg={4} className="titleNo">
          1
        </span>
        <span xs={2} md={2} lg={2} className="closeBtn">
          &#215;
        </span>
      </Grid>
      <Grid xs={4} md={8} lg={8} className="chqBody">
        {copy.map((val, ind, ele) => {
          return (
            <Grid xs={4} md={8} lg={8} className="chqBodyContent">
              <span xs={2} md={2} ld={2} className="chqTitle">
                Split No : {ind + 1}
              </span>
              <TextField
                type="number"
                xs={3}
                md={3}
                ld={3}
                label="Amount"
                name="amount"
                value={val.amount}
                variant="standard"
                onChange={(e) => handleChange(e, ind)}
              />
              <TextField
                xs={3}
                md={3}
                ld={3}
                id="date"
                label="date"
                type="date"
                name="date"
                value={val.date}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange(e, ind)}
              />
              <TextField
                xs={3}
                md={3}
                ld={3}
                label="Bank Name"
                variant="standard"
                name="bank"
                value={val.bank}
                onChange={(e) => handleChange(e, ind)}
              />
              {ind === ele.length - 1 ? (
                <ControlPointIcon
                  xs={3}
                  md={3}
                  ld={3}
                  className="iconBtn"
                  onClick={AddForm}
                />
              ) : (
                <RemoveRoundedIcon
                  xs={3}
                  md={3}
                  ld={3}
                  className="iconBtn"
                  onClick={() => {
                    DeleteForm(ind);
                  }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      <Grid xs={4} md={8} lg={8} className="chqBodyFooter">
        <span xs={4} md={8} lg={8} className="totalAmount">
          <strong>Total Value :</strong>
        </span>
        <span xs={4} md={8} lg={8} className="amountNo">
          {totalSum}
        </span>
      </Grid>

      <Grid xs={4} md={8} lg={8} className="chqFooter">
        <Stack direction="row" spacing={2}>
          <Button variant="contained" disabled>
            Reset
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Table;
