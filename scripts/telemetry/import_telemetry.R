# Import script for radio telemetry observations 

## Define Common Observation Fields

BASE_OBSERVATION <- list(
  contributor = list(
    name = 'DOC Telemetry',
    email = Sys.getenv('EMAIL')
  ),
  sighting_type = 'distant',
  precision = 1000,
  number = 1,
  comments = 'Data collected via a radio tracking flight.',
  status = 'radio',
  moderator_notes = 'Automatically imported.',
  location_details = '',
  favourite = FALSE,
  confirmed = TRUE,
  revisit = FALSE
)

## (1) Read data, convert coordinates

library(sf)

observations <- read.table(Sys.getenv('RAW_DATA'), header = TRUE, sep = ',')
observations <- st_as_sf(observations, coords = c("easting", "northing"), crs = 2193)
observations <- st_transform(observations, 4326)

## (2) Transform raw data into complete observations

transformer <- function (observation) {
  thing <- append(
    BASE_OBSERVATION,
    list(
      date_sighted=observation$date,
      time_sighted=observation$time,
      birds = list(
        list(
          banded = 'readable',
          bird = observation$bird
        )
      ),
      point_location = list(
        type = 'Point',
        coordinates = unlist(list(st_coordinates(observation$geometry)))
      ),
      import_id = observation$import_id
    )
  )
}

complete_observations <- apply(observations, 1, transformer)

## (3) Upload

library(jsonlite)
library(httr)

uploader <- function (observation) {
  print(observation$import_id)
  POST(Sys.getenv('API_URL'), 
       body = observation,
       encode = 'json',
       add_headers(Authorization = paste("Token", Sys.getenv('API_KEY')))
  )
}

lapply(complete_observations, uploader)
