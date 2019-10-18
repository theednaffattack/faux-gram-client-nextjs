import React from "react";

import * as T from "./types";
import Layout from "../../components/layout";

export interface CarsOverviewProps {
  cars?: T.CarList;
}

export interface CarsOverviewState {
  selectedCar: T.Car | null;
}

export default class CarsOverview extends React.Component<
  CarsOverviewProps,
  CarsOverviewState
> {
  constructor(props: CarsOverviewProps) {
    super(props);

    this.state = {
      selectedCar: null
    };
  }

  handleSelectCar = (car: T.Car): void => {
    this.setState({ selectedCar: car });
  };

  renderCarsList = (cars?: T.CarList): JSX.Element => {
    if (!cars || cars.length === 0) {
      return <p>No cars</p>;
    }

    return (
      <ul>
        {cars.map(
          (car: T.Car, index: number): JSX.Element => (
            <li key={index} onClick={() => this.handleSelectCar(car)}>
              {car.make} {car.model}
            </li>
          )
        )}
      </ul>
    );
  };

  renderCarInfo = (car: T.Car): JSX.Element => {
    if (!car) {
      return <div>Error: no car!</div>;
    }

    return (
      <div className="CarInfo">
        <h2>{`${car.make} ${car.model}`}</h2>
        <section>{car.engine}</section>
      </div>
    );
  };

  render() {
    const selectedCarComp = this.state.selectedCar ? (
      <div>{this.state.selectedCar}</div>
    ) : (
      <div>no car</div>
    );
    return (
      <Layout>
        <h1>Cars Overview</h1>

        <div className="Cars__List">{this.renderCarsList(this.props.cars)}</div>

        {selectedCarComp}
      </Layout>
    );
  }
}
