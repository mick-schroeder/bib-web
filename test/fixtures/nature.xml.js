export default `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" default-locale="en-GB">
  <info>
    <title>Nature</title>
    <id>http://www.zotero.org/styles/nature</id>
    <link href="http://www.zotero.org/styles/nature" rel="self"/>
    <link href="http://www.nature.com/nature/authors/gta/index.html#a5.4" rel="documentation"/>
    <link href="http://www.nature.com/srep/publish/guidelines#references" rel="documentation"/>
    <author>
      <name>Michael Berkowitz</name>
      <email>mberkowi@gmu.edu</email>
    </author>
    <category citation-format="numeric"/>
    <category field="science"/>
    <category field="generic-base"/>
    <issn>0028-0836</issn>
    <eissn>1476-4687</eissn>
    <updated>2022-07-02T13:18:26+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <macro name="title">
    <choose>
      <if type="bill book graphic legal_case legislation motion_picture report song" match="any">
        <text variable="title" font-style="italic"/>
      </if>
      <else>
        <text variable="title"/>
      </else>
    </choose>
  </macro>
  <macro name="author">
    <names variable="author">
      <name sort-separator=", " delimiter=", " and="symbol" initialize-with=". " delimiter-precedes-last="never" name-as-sort-order="all"/>
      <label form="short" prefix=", "/>
      <et-al font-style="italic"/>
    </names>
  </macro>
  <macro name="access">
    <choose>
      <if variable="volume" type="article" match="any"/>
      <else-if variable="DOI">
        <text variable="DOI" prefix="doi:"/>
      </else-if>
    </choose>
  </macro>
  <macro name="issuance">
    <choose>
      <if type="bill book graphic legal_case legislation motion_picture song thesis chapter paper-conference" match="any">
        <group delimiter="; " suffix=".">
          <group delimiter=", " prefix="(" suffix=")">
            <text variable="publisher" form="long"/>
            <date variable="issued">
              <date-part name="year"/>
            </date>
          </group>
        </group>
      </if>
      <else-if type="article">
        <group delimiter=" ">
          <choose>
            <if variable="genre" match="any">
              <text variable="genre" text-case="capitalize-first"/>
            </if>
            <else>
              <text term="article" text-case="capitalize-first"/>
            </else>
          </choose>
          <text term="at"/>
          <choose>
            <if variable="DOI" match="any">
              <text variable="DOI" prefix="https://doi.org/"/>
            </if>
            <else>
              <text variable="URL"/>
            </else>
          </choose>
          <date date-parts="year" form="text" variable="issued" prefix="(" suffix=")"/>
        </group>
      </else-if>
      <else-if type="report webpage post post-weblog" match="any">
        <group delimiter=" ">
          <text variable="URL"/>
          <date date-parts="year" form="text" variable="issued" prefix="(" suffix=")"/>
        </group>
      </else-if>
      <else>
        <date variable="issued" prefix="(" suffix=")">
          <date-part name="year"/>
        </date>
      </else>
    </choose>
  </macro>
  <macro name="container-title">
    <choose>
      <if type="article-journal">
        <text variable="container-title" font-style="italic" form="short"/>
      </if>
      <else>
        <text variable="container-title" font-style="italic"/>
      </else>
    </choose>
  </macro>
  <macro name="editor">
    <choose>
      <if type="chapter paper-conference" match="any">
        <names variable="editor" prefix="(" suffix=")">
          <label form="short" suffix=" "/>
          <name and="symbol" delimiter-precedes-last="never" initialize-with=". " name-as-sort-order="all"/>
        </names>
      </if>
    </choose>
  </macro>
  <macro name="volume">
    <choose>
      <if type="article-journal" match="any">
        <text variable="volume" font-weight="bold" suffix=","/>
      </if>
      <else>
        <group delimiter=" ">
          <label variable="volume" form="short"/>
          <text variable="volume"/>
        </group>
      </else>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout vertical-align="sup" delimiter=",">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography et-al-min="6" et-al-use-first="1" second-field-align="flush" entry-spacing="0" line-spacing="2">
    <layout suffix=".">
      <text variable="citation-number" suffix="."/>
      <group delimiter=" ">
        <text macro="author" suffix="."/>
        <text macro="title" suffix="."/>
        <choose>
          <if type="chapter paper-conference" match="any">
            <text term="in"/>
          </if>
        </choose>
        <text macro="container-title"/>
        <text macro="editor"/>
        <text macro="volume"/>
        <text variable="page"/>
        <text macro="issuance"/>
        <text macro="access"/>
      </group>
    </layout>
  </bibliography>
</style>`
