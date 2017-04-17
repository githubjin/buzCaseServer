// @flow

export function autocomplete(
  user: string,
  key: string,
  value: string,
  size: number = 10
) {
  var match = {}, fields = {};
  match[key] = value;
  fields[key] = {};
  // console.log(match, fields);
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            match
          },
          {
            term: {
              user
            }
          }
        ]
      }
    },
    aggs: {
      dedup: {
        terms: {
          field: "id",
          size: size
        },
        aggs: {
          dedup_docs: {
            top_hits: {
              size: 1,
              highlight: {
                pre_tags: ["<span class='highlight'>"],
                post_tags: ["</span>"],
                fields
              }
            }
          }
        }
      }
    }
  };
}
