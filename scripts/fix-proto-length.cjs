const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  path.join(root, 'src', 'generated', 'order_pb.js'),
  path.join(root, 'src', 'generated', 'product_pb.js'),
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;

  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/if \(f\.length > 0\) \{\n\s*writer\.writeString\(\n\s*2,\n\s*f\n\s*\);\n\s*\}/g, "if (typeof f === 'string' && f.length > 0) {\n    writer.writeString(\n      2,\n      f\n    );\n  }");
  text = text.replace(/if \(f\.length > 0\) \{\n\s*writer\.writeString\(\n\s*2,\n\s*f\n\s*\);\n\s*\}\n\s*f = message\.getStock\(\);/g, "if (typeof f === 'string' && f.length > 0) {\n    writer.writeString(\n      2,\n      f\n    );\n  }\n  f = message.getStock();");

  fs.writeFileSync(file, text);
}

