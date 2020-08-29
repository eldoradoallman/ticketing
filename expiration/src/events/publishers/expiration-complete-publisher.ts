import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@mandi_telor/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: ExpirationCompleteEvent["subject"] = Subjects.ExpirationComplete;
}
