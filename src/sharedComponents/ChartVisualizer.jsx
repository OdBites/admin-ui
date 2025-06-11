import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Typography, useTheme } from "@mui/material";

const ChartVisualizer = ({
  type,
  data,
  dataKeyX,
  dataKeyY,
  width = "100%",
  height = 300,
}) => {
  const theme = useTheme();

  const chartProps = {
    width,
    height,
    data,
    // barSize: 30,
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart {...chartProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey={dataKeyX} stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                border: "1px solid " + theme.palette.divider,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKeyY}
              stroke={theme.palette.primary.main}
              strokeWidth={2}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...chartProps} barSize={50}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey={dataKeyX} stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                border: "1px solid " + theme.palette.divider,
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend />
            <Bar
              dataKey={dataKeyY}
              fill={theme.palette.primary.main}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        );

      case "area":
        return (
          <AreaChart {...chartProps}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey={dataKeyX} stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                border: "1px solid " + theme.palette.divider,
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={dataKeyY}
              fill={theme.palette.primary.main}
              stroke={theme.palette.primary.dark}
            />
          </AreaChart>
        );

      case "pie":
        return (
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey={dataKeyY}
              nameKey={dataKeyX}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={theme.palette.primary.main}
              label
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                border: "1px solid " + theme.palette.divider,
              }}
            />
          </PieChart>
        );

      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" {...chartProps}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey={dataKeyX}
              stroke={theme.palette.text.primary}
            />
            <PolarRadiusAxis stroke={theme.palette.text.primary} />
            <Radar
              name="Value"
              dataKey={dataKeyY}
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.main}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                border: "1px solid " + theme.palette.divider,
              }}
            />
            <Legend />
          </RadarChart>
        );

      default:
        return <Typography color="error">Invalid chart type</Typography>;
    }
  };

  return (
    // <Box
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: theme.palette.background.paper,
    //     padding: 2,
    //     borderRadius: 2,
    //     boxShadow: 2,
    //   }}
    // >
    <ResponsiveContainer width="100%" height={300}>
      {renderChart()}
    </ResponsiveContainer>
    //  </Box>
  );
};

ChartVisualizer.propTypes = {
  type: PropTypes.oneOf(["line", "bar", "area", "pie", "radar"]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKeyX: PropTypes.string.isRequired,
  dataKeyY: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ChartVisualizer;
