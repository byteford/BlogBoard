mkdir -p blogs
cd blogs

input="../blog_urls.txt"
> blognames.txt

while IFS= read -r line
do
  expectedSize=$(curl -sI ${line} | awk '/Content-Length/{gsub("\\r", ""); print $2}')
  blogname=$(echo ${line##*/}|cut -f1 -d".")

  curl ${line} --output ${blogname}.txt

  #get the actual file size
  filesize=$(wc -c < ${blogname}.txt)
  echo ${filesize}
  echo ${expectedSize}
  if [[ ${expectedSize} -eq ${filesize} ]] && [[ ${blogname} =~ ^[A-Za-z_]+$ ]]
   then
    echo "${blogname} passed"
    echo ${blogname} >> blognames.txt
  fi
done < "$input"