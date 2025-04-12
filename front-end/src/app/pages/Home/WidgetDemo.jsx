import Widget from "../../../components/common/Widget/Widget";
import "../../../index.css";

function WidgetDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Widget>
        <h3 className="text-xl font-semibold mb-4">Widget 1</h3>
        <p>Content goes here</p>
      </Widget>

      <Widget>
        <h3 className="text-xl font-semibold mb-4">Widget 2</h3>
        <p>Content goes here</p>
      </Widget>

      <Widget>
        <h3 className="text-xl font-semibold mb-4">Widget 3</h3>
        <p>Content goes here</p>
      </Widget>

      <Widget className="md:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Wide Widget</h3>
        <p>This widget spans two columns</p>
      </Widget>

      <Widget>
        <h3 className="text-xl font-semibold mb-4">Widget 4</h3>
        <p>Content goes here</p>
      </Widget>
    </div>
  );
}

export default WidgetDemo;
