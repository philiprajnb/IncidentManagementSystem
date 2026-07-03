import { useState } from "react";
import type { ComponentProps } from "react";
import {
  Button,
  Form,
  Modal,
} from "react-bootstrap";

import { IncidentSeverity } from "../../types/incident";
import type { IncidentSeverity as IncidentSeverityType } from "../../types/incident";

import { useCreateIncident } from "../../hooks/useCreateIncident";

interface Props {
  show: boolean;
  onHide: () => void;
}

const CreateIncidentModal = ({
  show,
  onHide,
}: Props) => {

  const mutation = useCreateIncident();

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [severity, setSeverity] =
  useState<IncidentSeverityType>(IncidentSeverity.LOW);

  const handleSubmit: ComponentProps<
    "form"
  >["onSubmit"] = (e) => {

    e.preventDefault();

    void mutation.mutateAsync({
      title,
      description,
      severity,
    }).then(() => {
      onHide();

      setTitle("");

      setDescription("");

      setSeverity(
        IncidentSeverity.LOW
      );
    });

  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Form onSubmit={handleSubmit}>

        <Modal.Header closeButton>
          <Modal.Title>
            New Incident
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Group className="mb-3">

            <Form.Label>
              Title
            </Form.Label>

            <Form.Control
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
               disabled={mutation.isPending}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>
              Description
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
              disabled={mutation.isPending}
            />

          </Form.Group>

          <Form.Group>

            <Form.Label>
              Severity
            </Form.Label>

            <Form.Select
              value={severity}
              onChange={(e) =>
                setSeverity(
                  e.target.value as IncidentSeverityType
                )
              }
            disabled={mutation.isPending}
            >

              {Object.values(
                IncidentSeverity
              ).map((value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              ))}

            </Form.Select>

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={onHide}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Creating..."
              : "Create"}
          </Button>

        </Modal.Footer>

      </Form>
    </Modal>
  );

};

export default CreateIncidentModal;
