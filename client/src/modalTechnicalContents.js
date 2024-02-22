import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

markdown.render("# Header");


export default [
    {
      name: 'global_graph',            
      content: markdown.render("# Header body. <br> another thing."),
    },
    {
        name: 'global_earnings',            
        content: 'Global earnings notes.',
    }
  ]
  