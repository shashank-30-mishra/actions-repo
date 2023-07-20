const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get some inputs
    const bucke = core.getInput('bucket', { required: true });
    const bucketregion = core.getInput('bucket-region', { required: true });
    const distfolder = core.getInput('dist-folder', { required: true });

    // 2) Uploading file
    const uri = `s3://${ bucke }`
    exec.exec(`aws s3 sync ${ distfolder } ${ uri } ${ distfolder } --region ${ bucketregion }`);

    core.notice('Hello from my custom JavaScript Action!');

    const weburl = `http://${bucke}.s3-website-${bucketregion}.amazonaws.com`;
    core.setOutput('website-url',weburl)
}

run();