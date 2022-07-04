<template>
    <div id="app" ref="chart">
    </div>
</template>

<script>
    /// echarts 的示例数据
    import population from './population.json';
    import * as echarts from 'echarts';
    import "echarts-gl";
    import china from './map/json/china.json';
    import response from './response2.json';

    function out_of_china(lng, lat) {
        return ( lng < 72.004 || lng > 137.8347 ) || ( ( lat < 17.8293 || lat > 55.8271 ) || false );
    }

    export default {
        name: 'App',
        components: {},
        mounted() {
            echarts.registerMap('china', china);
            this.chart = echarts.init(this.$refs.chart);
            let data = response.map(function (dataItem) {
                let n = dataItem[2];
                return [dataItem[0], dataItem[1], n];
            });
            /// 性能差的 3d 展示
            let option2 = {
                backgroundColor: '#09152a',
                geo3D: {
                    map: 'china',
                    shading: 'lambert',
                    light: {
                        main: {
                            intensity: 5,
                            shadow: true,
                            shadowQuality: 'high',
                            alpha: 30
                        },
                        ambient: {
                            intensity: 0
                        },
                        ambientCubemap: {
                            texture: 'data-gl/asset/canyon.hdr',
                            exposure: 1,
                            diffuseIntensity: 0.5
                        }
                    },
                    viewControl: {
                        distance: 50,
                        panMouseButton: 'left',
                        rotateMouseButton: 'right'
                    },
                    groundPlane: {
                        show: false,
                        color: '#09152a'
                    },
                    postEffect: {
                        enable: true,
                        bloom: {
                            enable: false
                        },
                        SSAO: {
                            radius: 1,
                            intensity: 1,
                            enable: true
                        },
                        depthOfField: {
                            enable: false,
                            focalRange: 10,
                            blurRadius: 10,
                            fstop: 1
                        }
                    },
                    temporalSuperSampling: {
                        enable: true
                    },
                    itemStyle: {},

                    regionHeight: 2
                },
                visualMap: {
                    max: 100,
                    calculable: true,
                    realtime: false,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    outOfRange: {
                        colorAlpha: 0
                    }
                },
                series: [{
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    shading: 'lambert',
                    data: data,
                    barSize: 0.1,
                    minHeight: 0.2,
                    silent: true,
                    itemStyle: {
                        color: 'orange'
                        // opacity: 0.8
                    }
                }]
            };
            /// 平面性能好的展示
            let option = {
                backgroundColor: '#09152a',
                title: {
                    text: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    roam: true,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    silent: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: [{
                    name: '弱',
                    type: 'scatterGL',
                    progressive: 1e6,
                    coordinateSystem: 'geo',
                    symbolSize: 1,
                    zoomScale: 0.002,
                    blendMode: 'lighter',
                    large: true,
                    itemStyle: {
                        color: 'rgb(20, 15, 2)'
                    },
                    postEffect: {
                        enable: true
                    },
                    silent: true,
                    dimensions: ['lng', 'lat'],
                    data: data
                }]
            };
            this.chart.setOption(option);
        }
    }
</script>

<style lang="scss">
    #app {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
