# Test Automation Charts

## Description
This is a web portal to consolidate all test automation data for the SLA project. It uses CanvasJS to render charts for data visualization. 

It's hosted by an IBM HTTP Server on the report server.

## Owner
Author: Ruifeng Ma (mrfflyer@gmail.com)
Organization: IBM

## Development
Below two customized APIs offered by [RTCWeb](https://github.com/MaRuifeng/RTCWeb) are used to obtain test data which are used to populate the page via the `report.js` javascript. 

    http://<HOST_or_IP>:<PORT>/RTCWebClient/v0.1/api/testResult/getBuildPassRates?pageNumber=1&pageSize=20&testPhase=BVT
    http://<HOST_or_IP>:<PORT>/RTCWebClient/v0.1/api/testResult/getAllSprints

Sample return results in JSON formats are included in the source code for reference. 

## Deployment
Put the source code files directly into a designated directory of the HTTP server on the report server host.
For an IBM Http Server, the location could be `/opt/IBM/HTTPServer/htdocs/test_auto_charts/`.

## Usage 
Open up below webpage via a browser. 
http://<REPORT_SERVER_HOST_or_IP>/<HTTP_PATH>/sla_test_auto_trend.html

## Contributing
Contact the owner before contributing.

1. Fork the repository on Git
2. Create a named feature branch (like `add_component_x`)
3. Write your change
4. Write tests for your change (if applicable)
5. Run the tests, ensuring they all pass
6. Submit a Pull Request using Github


