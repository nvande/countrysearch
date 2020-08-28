# Country Search

### Country Search uses the REST Countries API to perform country searches by name, fullname, or country code

After a search is completed, the following data is displayed:
* Country Name
* Alpha Code 2
* Alpha Code 3
* Region
* Subregion
* Population
* Languages
* Country Flag Image

The application also displays a summary containing the total number of results, as well as the number of results by region and subregion.

### Country Search requires two processes to run locally:
* first you must start the PHP server, and then launch the React web application

## Starting the Server

To start the server execute the following command in the project root:

```
./server
```

This requires a PHP binary in your system path

## Starting the Application

To start the Country Search application execute the following command in the project root:

```
npm start
```

Then, navaigate to [http://localhost:3000](http://localhost:3000) to view it in the browser.