#!/bin/sh
AWS_BUCKET = "linkedin-mini" 
AWS_ENDPOINT = "http://minio:9000"
AWS_ACCESS_KEY_ID = "YX5NGYgypBTlyrbEblEP"
AWS_SECRET_ACCESS_KEY = "1vgq3N5OvK5pMHUiMUfWAbB491u80DEMKabYxrbP"

/usr/bin/mc config host add local ${AWS_ENDPOINT} ${AWS_ACCESS_KEY_ID} ${AWS_SECRET_ACCESS_KEY}; #host add in endpoint with user name, pass
/usr/bin/mc mb local/${AWS_BUCKET}; #make bucket; in this local
/usr/bin/mc policy set public local/${AWS_BUCKET}; #public bucket 
/usr/bin/mc anonymous set public local/${AWS_BUCKET}; #public bucket

exit 0;