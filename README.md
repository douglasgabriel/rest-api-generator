# Rest API Generator

A Node lib that helps to create a Restful API from a Json file.

### Instalation

Clone the project with:

`git clone https://github.com/douglasgabriel/rest-api-generator.git`

Then go inside the new folder and run:

`npm install`

So execute the project with:

`node server.js`

### api.json

You can configure the API adding new resources and setting its configurations on the **api.json** file inside the root directory.

#### The file

<pre>

{
    "baseUri" : "/v1/api/",
    "resources" : [
        {
            "name" : "users",
            "properties" : {
                "name" : {
                    "type" : "String"
                },
                "age" : {
                    "type" : "Number"
                }
            }
        },
        {
            "name" : "cars",
            "properties" : {
                "brand" : {
                    "type" : "String"
                },
                "model" : {
                    "type" : "String"
                }
            }
        }
    ]
}

</pre>

Where:

| Property             | Value                                |
|----------------------|--------------------------------------|
| baseUri              | The URI that will be add to the beginning of the endpoints |
| resources            | An array of the resources of the API |
| resources.name       | The name of the resource that will be use to mount the endpoints and the models inside MongoDB |
| resources.properties | The fields of the model that is represented by the resource. Inside this property you can put the attributes of the model and define its types |

