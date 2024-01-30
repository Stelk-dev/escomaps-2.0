import React, { useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function CreateAdvBio({ advData, onContinue, onBack }) {
  const [title, setTitle] = useState(advData.title ?? "");
  const [description, setDescription] = useState(advData.description ?? "");

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Titolo e descrizione
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Aggiungi un titolo e una descrizione al tuo annuncio
      </div>
      <br />

      <form>
        <input
          className="main-form"
          type="text"
          style={{ marginBottom: "10px" }}
          placeholder="Titolo"
          value={title}
          onChange={(v) => setTitle(v.target.value)}
        />
        <textarea
          className="main-form"
          type="text"
          style={{
            height: "200px",
            minHeight: "200px",
            maxHeight: "200px",
            paddingTop: "10px",
          }}
          rows="5"
          value={description}
          placeholder="Descrizione annuncio"
          onChange={(v) => setDescription(v.target.value)}
        ></textarea>
      </form>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({
            title: title,
            description: description,
          });
        }}
        isDisabled={title.length === 0 || description.length === 0}
        onBack={onBack}
      />
    </div>
  );
}
