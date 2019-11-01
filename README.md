# Cities Scrapping 

This application is used to scrape the names of cities to which flights are departing from Vienna airport. After scrapping the names of the cities it gets the temperature from an API, creates a note depending on the temperature in the city and inserts the note in the database.

#### To get the application:
<pre>
git clone https://github.com/dejsenlitro/cities-scrapping.git
cd cities-scrapping
</pre>


#### Before starting the application make sure to have PostgreSQL service running and edit the databaseOptions in config.ts file to connect to the service:
<pre>
export const DatabaseOptions: any = {
  host: '0.0.0.0',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
}
</pre>
#### After the database is setup run the create.sql script in the scripts folder:
<pre>
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
</pre>

#### To start the application:
<pre>
npm i
npm start
</pre>

