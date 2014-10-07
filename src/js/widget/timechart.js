/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'locale-date', 'flot-resize', 'flot-time', 'flot-tooltip', 'flot-navigate'], function(SOS, ld) {
    "use strict";

    var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end"];
    var propertyNames = null;

    return {
        inputs: inputs,
        init: function(config, renderTo) {
            SOS.setUrl(config.service);
            read();

            function read() {
                var features = isArray(config.features) ? config.features : JSON.parse(config.features);
                var properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
                var time_range = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : null;
                SOS.getObservation(config.offering, features, properties, time_range, draw);
            }

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            function draw(observations) {
                function d(n) {
                    return n < 10 ? "0" + n : "" + n;
                }

                // Get tabular data from observations
                var rows = [];
                for (var i in observations) {
                    var obs = observations[i];
                    var result = obs.result;

                    rows.push({
                        feature: obs.featureOfInterest.name.value,
                        property: obs.observableProperty,
                        time: new Date(obs.resultTime).getTime(),
                        value: result.hasOwnProperty("value") ? result.value : result,
                        uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)"
                    });
                }

                if (propertyNames) {
                    createChart(rows);
                } else if (observations.length) {
                    getPropertyNames(observations[0].procedure, rows);
                }
            }

            function getPropertyNames(procedure, rows) {
                SOS.describeSensor(procedure, function(description) {
                    var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                    properties = properties instanceof Array ? properties : [properties];
                    var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];
                    propertyNames = [];

                    for (var i in properties) {
                        var property = properties[i];
                        for (var j in types) {
                            var type = types[j];
                            if (property.hasOwnProperty(type)) {
                                property.id = property[type].definition;
                            }
                        }
                        propertyNames[property.id] = property.name;
                    }
                    createChart(rows);
                });
            }

            function createChart(rows) {
                var series = {};
                for (var i in rows) {
                    var row = rows[i];
                    var label = propertyNames[row.property] + " (" + row.feature + ")";
                    if (!series[label]) {
                        series[label] = {
                            data: []
                        };
                    }
                    series[label].data.push([row.time, row.value]);
                }

                var data = [];
                for (var key in series) {
                    series[key].label = key;
                    data.push(series[key]);
                }

                var sortFunction = function(a, b) {
                    return b[0] - a[0];
                };

                for (var s in data) {
                    series = data[s];
                    series.data.sort(sortFunction);
                }

                var options = {
                    xaxis: {
                        mode: "time",
                        timezone: ld.utc() ? "UTC" : "browser"
                    },
                    yaxis: {
                        zoomRange: false,
                        panRange: false
                    },
                    grid: {
                        hoverable: true
                    },
                    series: {
                        lines: {
                            show: true
                        },
                        points: {
                            show: true
                        }
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "[%x] %s: %y.2 " + rows[0].uom
                    },
                    zoom: {
                        interactive: true
                    },
                    pan: {
                        interactive: true
                    }
                };

                // Widget contents
                var contents = '<div class="timechart widget">';
                contents += config.title ? '<h3 class="title">' + config.title + '</h3>' : "";
                contents += "<div class='graph' style='height:100%;'></div>";
                contents += '</div>';
                renderTo.innerHTML = contents;

                var elem = renderTo.querySelector(".graph");

                $.plot(elem, data, options);

            }
        }
    };

});
