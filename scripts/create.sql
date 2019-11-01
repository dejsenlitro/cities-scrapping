CREATE SCHEMA weather;

CREATE TABLE weather.cities_data (
	id serial NOT NULL PRIMARY KEY,
    city text NOT NULL,
    temperature text NOT NULL,
    note text NOT NULL,
    time bigint NOT NULL
);

CREATE TABLE weather.city_temperatures (
	id serial NOT NULL PRIMARY KEY,
    temperatures jsonb NOT NULL,
    time bigint NOT NULL
)

