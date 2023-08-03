export default [
  {
    name: "atr",
    items: [
      {
        text: "pagesize",
        name: "pagesize",
        placeholder: "每页显示条目数量",
        type: "number",
        min: 1
      },
      {
        text: "pagercount",
        name: "pagercount",
        placeholder: "页码按钮的数量，当总页数超过该值时会折叠",
        type: "number",
        min: 1
      },
      {
        text: "total",
        name: "total",
        placeholder: "总条目数",
        type: "number",
        min: 1
      }
    ]
  }
];
