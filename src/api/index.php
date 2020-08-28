<?php
header("Access-Control-Allow-Origin: *");
/**
 * This php server opens a curl tunnel to the REST countries API,
 * performs a search action by either name, full name, or country code,
 * and sorts the response by population. The data is returned as JSON.
 */

// Define base REST Country API urls 

// endpoint for searching by country name
$url_name = 'https://restcountries.eu/rest/v2/name';

// additional query for searching by only full name
$query_str_fullname = '?fullText=true';

// endpoint for searching by country code
$url_code = 'https://restcountries.eu/rest/v2/alpha';

// Define the possible query keys for this server
$codeQuery = 'code';
$fullNameQuery = 'fullName';

header('Content-Type: application/json');
$rest_json = file_get_contents("php://input");
$_GET = json_decode($rest_json, true);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$query_str = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
parse_str($query_str, $query_params);

// Boolean for search by country code, otherwise it will be by name
$code = (array_key_exists($codeQuery, $query_params) && $query_params[$codeQuery] == 'true') ? 1 : 0;

// Boolean for search by full name
// this will be ignored if we are searching by country code
$fullName = (array_key_exists($fullNameQuery, $query_params) && $query_params[$fullNameQuery] == 'true') ? 1 : 0;

if(!$code){
    $query = $fullName ? $query_str_fullname : '';
    $url = $url_name . $uri . $query;
}
else {
    $url = $url_code . $uri;
}

// Open Curl Tunnel
$ch = curl_init();
curl_setopt_array($ch,
    array (
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true
    )
);

// Make API call
$result = curl_exec($ch);

// Close Curl Tunnel
curl_close($ch);

// Determine if request was a success
$status = 'status';
$res_json = json_decode($result, false);
$res_code = 200;

if(is_object($res_json) && property_exists($res_json, $status))$res_code = $res_json->$status;
if($res_code > 299) { // client error has occured
    http_response_code($res_code); // pass the code along
    echo $result; // and the JSON data
}
else{ //response was OK

    //function to sort responses by population
    function cmp($a, $b) {
        $sortBy = 'population';
        $a_val = $a->$sortBy;
        $b_val = $b->$sortBy;
        if ( $a_val == $b_val )return 0;
        return ($a_val > $b_val) ? -1 : 1;
    }

    // JSON needs to be of type array to sort
    $array = (array) $res_json;
    if($code){ 
        $array = [$array];
    }
    usort($array, 'cmp');
    $sorted_result = $array;

    if($result) {
        // Set the Response code and dump the response
        http_response_code($res_code);
        echo json_encode(['data' => $sorted_result]);
    }
}




