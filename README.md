# Country Search

### Country Search uses the REST Countries API to perform country searches by name, fullname, or country code

<br />

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

<br />

### Country Search requires two processes to run locally:
* PHP server
* React web application

<br />

## Starting the Server

To start the server execute the following command in the project root:

```
./server
```

This requires a PHP binary in your system path

<br />

## Starting the Application

To start the Country Search application execute the following command in the project root:

```
npm start
```

Then, navaigate to [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br />

## Testing the Application

To run the automated tests for Country Search execute the following command in the project root:

```
npm test
```

(note: the project is not fully unit and integration tested, these tests only serve as an example of how tests might be automated)