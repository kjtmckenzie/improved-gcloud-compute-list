# improved-gcloud-compute-list

This utility uses node.js.  Please make sure to install that before continuing.  This is already built into the GCP cloud shell.  You must also install the [gcloud SDK](https://cloud.google.com/sdk/install).

### Installing the client library


    npm install @google-cloud/compute



### Before running

You need to set your application default credentials.  If you're in the cloud shell, this is not needed.  Elsewhere, run the following:

    gcloud auth application-default login
    gcloud config set project <project_name>



### Run the code

    node list_vms.js
