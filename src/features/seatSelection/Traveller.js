import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dateTimeToDate, dateTimeToTime } from "../dateTime/dateTime";

const Traveller = () => {
  const { objectParam, arrayParam } = useParams();
  const ticket = JSON.parse(decodeURIComponent(objectParam));
  const selectSeat = JSON.parse(decodeURIComponent(arrayParam));

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const onNameChange = (e) => setName(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onSpecialRequestChange = (e) => setSpecialRequest(e.target.value);

  const traveller = {
    name,
    gender,
    phone,
    email,
    specialRequest
  }

  const canPayment = [name,
    gender,
    phone,
    email].every(Boolean)

  const navigate = useNavigate()

  const handleButtonClick = () => {
    const travellerParam = encodeURIComponent(JSON.stringify(traveller));
    navigate(
      `/selectSeat/traveller/${objectParam}/${arrayParam}/${travellerParam}`
    );

  }

  console.log(traveller);

  function renderGender(selectSeat) {
    if (selectSeat?.length === 1) {
      return (
        <div>
          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="gender"
              id="radio-MALE_ONLY"
              value="MALE_ONLY"
              onChange={onGenderChange}
            />
            <label className="form-check-label" htmlFor="radio-MALE_ONLY">
              Male
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="gender"
              id="radio-FEMALE_ONLY"
              value="FEMALE_ONLY"
              onChange={onGenderChange}
            />
            <label className="form-check-label" htmlFor="radio-FEMALE_ONLY">
              Female
            </label>
          </div>
        </div>
      );
    }
    if (selectSeat?.length > 1) {
      return (
        <div>
          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="gender"
              id="radio-MALE_ONLY"
              value="MALE_ONLY"
              onChange={onGenderChange}
            />
            <label className="form-check-label" htmlFor="radio-MALE_ONLY">
              Male Group
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="gender"
              id="radio-FEMALE_ONLY"
              value="FEMALE_ONLY"
              onChange={onGenderChange}
            />
            <label className="form-check-label" htmlFor="radio-FEMALE_ONLY">
              Female Group
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="gender"
              id="radio-MIXED"
              value="MIXED"
              onChange={onGenderChange}
            />
            <label className="form-check-label" htmlFor="radio-MIXED">
              Mixed Group
            </label>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 mb-3">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group m-2">
                  <label className="text-weight-normal  required mb-2">
                    Traveller Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    className="form-control"
                    required="required"
                    onChange={onNameChange}
                  />

                  <div className="text-danger">
                    <strong></strong>
                  </div>
                </div>
                <div className="form-group m-2 mt-4">
                  <label className="required">Gender </label>
                  {renderGender(selectSeat)}
                </div>
                <div className="form-group m-2 mt-4">
                  <label className="text-weight-normal  required mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phone}
                    onChange={onPhoneChange}
                    pattern="09(\d{7,9})"
                    placeholder="09 _ _ _ _ _ _ _"
                    help="Enter a Myanmar cell phone number. Example: 0912345667"
                    className="form-control"
                    required="required"
                  />

                  <small className="form-text text-muted">
                    Enter a Myanmar cell phone number. Example: 09123456789
                  </small>

                  <div className="text-danger">
                    <strong></strong>
                  </div>
                </div>
                <div className="form-group m-2 mt-4">
                  <label className="text-weight-normal mb-2">Email</label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChange}
                    className="form-control"
                  />

                  <div className="text-danger">
                    <strong></strong>
                  </div>
                </div>

                <div className="form-group m-2 mt-4">
                  <label className="text-weight-normal mb-2">
                    Special Request
                  </label>

                  <input
                    type="text"
                    id="specialRequest"
                    name="specialRequest"
                    value={specialRequest}
                    onChange={onSpecialRequestChange}
                    className="form-control"
                  />

                  <div className="text-danger">
                    <strong></strong>
                  </div>
                </div>

              <div className="d-flex justify-content-center m-2 mt-4">
                <button style={{width : '100%'}} onClick={handleButtonClick} disabled={!canPayment} className="btn btn-success">Continue to Payment</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header font-weight-bold">Booking Summary</div>
            <div className="card-body">
              <table className="table table-sm table-borderless summary-table ">
                <tbody>
                  <tr>
                    <td>Bus Operator</td>
                    <td>Burmese Bus</td>
                  </tr>

                  <tr>
                    <td>Route</td>
                    <td>{`${ticket.route?.startLocation} - ${ticket.route?.endLocation}`}</td>
                  </tr>
                  <tr>
                    <td>Departure Time</td>
                    <td>{`${dateTimeToDate(
                      ticket.startDateTime
                    )}, ${dateTimeToTime(ticket.startDateTime)}`}</td>
                  </tr>
                  <tr>
                    <td>Arrival Time</td>
                    <td>{`${dateTimeToDate(
                      ticket.endDateTime
                    )}, ${dateTimeToTime(ticket.endDateTime)}`}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-borderless table-sm summary-table border-top">
                <tbody>
                  <tr>
                    <td>Number of Seats</td>
                    <td>{selectSeat.length} seat(s) </td>
                  </tr>

                  <tr>
                    <td>Seat No.</td>
                    <td>{selectSeat.join(', ')}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-borderless table-sm summary-table border-top">
                <tbody>
                  <tr>
                    <td className="text-success font-weight-bold">Subtotal</td>
                    <td className="text-success font-weight-bold">
                      {(ticket.price) * (selectSeat.length)} MMK
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traveller;
